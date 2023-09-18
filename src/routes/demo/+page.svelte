<script>
  import RequestForm from './components/request-form';
</script>

<div class="max-w-md text-center">
  <h3 class="text-3xl font-bold">Demo</h3>
  <p class="py-4">
    Send a request to WebTrigger service to test your receptors. In terms of practicality, we will forward the request
    from the WebTrigger service back to you. Keep in mind: the action should match one of the receptors.
  </p>
</div>

<div class="md:w-full lg:w-2/4">
  <RequestForm />
</div>
