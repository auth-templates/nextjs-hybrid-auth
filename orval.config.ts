export default {
  api: {
    input: '',
    output: {
        mode: 'split',
        target: './src/api/generated/',
        mock: true, // enables MSW mock files
        client: 'axios',
    },
  },
};
