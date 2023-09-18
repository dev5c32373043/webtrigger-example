import { toast } from '@zerodevx/svelte-toast';

export default {
  info(message, duration = 5000) {
    toast.push(message, {
      duration,
      theme: {
        '--toastBackground': '#00d95d',
        '--toastColor': '#fafafa',
        '--toastBarBackground': '#fafafa'
      }
    });
  },
  warn(message, duration = 5000) {
    toast.push(message, {
      duration,
      theme: {
        '--toastBackground': '#f56a00',
        '--toastColor': '#fafafa',
        '--toastBarBackground': '#fafafa'
      }
    });
  },
  err(message, duration = 5000) {
    toast.push(message, {
      duration,
      theme: {
        '--toastBackground': '#fa0032',
        '--toastColor': '#fafafa',
        '--toastBarBackground': 'grey'
      }
    });
  }
};
