<script>
  import '../app.css';

  import { SvelteToast } from '@zerodevx/svelte-toast';

  import Header from './components/header';
</script>

<svelte:head>
  <title>WebTrigger: Simplify, Amplify, Excel</title>
</svelte:head>

<main class="flex min-h-screen flex-col items-center">
  <Header />
  <slot />
  <SvelteToast options={{ dismissable: false }} />
</main>
