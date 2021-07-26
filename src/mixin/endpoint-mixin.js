import { GetEndPoint } from '../service/genericService.js';
export default {
  methods: {
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}`: '';
    },
  },
}