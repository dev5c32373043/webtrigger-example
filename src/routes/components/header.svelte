<script>
  import { page } from '$app/stores';
</script>

<header
  class="border-b-1 relative z-20 w-full mb-5 border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden"
>
  <div class="relative mx-auto max-w-full lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
    <nav aria-label="main navigation" class="flex h-[5.5rem] items-stretch justify-center font-medium">
      <a
        class="flex items-center gap-2 whitespace-nowrap py-3 text-lg text-slate-700 focus:outline-none flex-1"
        href="/"
      >
        <img src="/logo.svg" width={64} height={64} alt="Logo" />
        WebTrigger
      </a>

      <div class="tabs">
        <a href="/" class="tab tab-lg tab-bordered" class:tab-active={$page.url.pathname === '/'}>Receptors</a>
        <a href="/demo" class="tab tab-lg tab-bordered" class:tab-active={$page.url.pathname === '/demo'}>Demo</a>
      </div>
    </nav>
  </div>
</header>
