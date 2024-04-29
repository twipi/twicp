<script lang="ts">
  import GppGood from "svelte-google-materialdesign-icons/Gpp_good.svelte"
  import GppBad from "svelte-google-materialdesign-icons/Gpp_bad.svelte"

  import { type AddedToast, addToast } from "#/lib/toasts"
  import { slide } from "svelte/transition"
  import { call, session, loginPhase1, loginPhase2 } from "#/lib/api"
  import { canonicalizePhoneNumber } from "#/lib/canonical"
  import { push as goto } from "svelte-spa-router"

  let phoneNumber = ""
  let code = ""
  let sentCode = false
  let loading = false
  let addedToast: AddedToast

  async function submitForm() {
    loading = true
    try {
      phoneNumber = canonicalizePhoneNumber(phoneNumber)

      if (!sentCode) {
        await call(loginPhase1, {}, { phoneNumber })

        sentCode = true
        addedToast = addToast({
          type: "info",
          title: "Login code sent",
          message: "Please check your phone for the login code.",
        })
      } else {
        addedToast.remove()

        const resp = await call(loginPhase2, {}, { phoneNumber, code })
        $session = {
          token: resp.token,
          phoneNumber,
        }

        goto("/")
      }
    } finally {
      loading = false
    }
  }
</script>

<main class="container">
  <h1>Login</h1>

  <form on:submit|preventDefault={() => submitForm()}>
    <formset>
      <label>
        Phone Number
        <input
          type="tel"
          name="phone"
          bind:value={phoneNumber}
          required
          pattern={"\\+[0-9 ()-]{9,}"}
          placeholder="+11234567890"
          disabled={sentCode}
        />
      </label>
    </formset>

    {#if sentCode}
      <formset transition:slide>
        <label>
          Login Code
          <input type="text" name="code" bind:value={code} required placeholder="12345678" />
        </label>
      </formset>
    {/if}

    <formset>
      <button type="submit" class="sms-login" disabled={loading}>
        Login over SMS
        <GppBad />
      </button>

      <button type="submit" class="rcs-login" disabled>
        Login over RCS
        <GppGood />
      </button>
    </formset>
  </form>
</main>

<style lang="scss">
  main {
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    h1 {
      margin-top: 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    formset {
      &:not(:last-child) {
        margin-bottom: var(--pico-spacing);

        input {
          margin-bottom: 0;
        }
      }

      &:last-child {
        margin-top: var(--pico-spacing);
      }
    }

    button {
      text-align: left;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &.sms-login {
        background-color: #ffff66;
      }

      &.rcs-login {
        background-color: #b3ff66;
      }
    }
  }
</style>
