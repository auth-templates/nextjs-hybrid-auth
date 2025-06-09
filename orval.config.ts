export default {
  api: {
    input: './api-spec/flexible-leaves-api.yml',
    output: {
        mode: 'split',
        target: './src/api/generated/',
        mock: true, // enables MSW mock files
        client: 'axios',
    },
  },
};
