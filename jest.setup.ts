process.on('unhandledRejection', (reason) => {
  console.error('Jest has found an unhandled exception!');
  fail(reason);
});
