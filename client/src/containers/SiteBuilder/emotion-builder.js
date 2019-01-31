import createEmotion from 'create-emotion';

const emotionContainer = document.createElement('div');
emotionContainer.id = 'emotionBuilderFrame';
document.body.insertBefore(emotionContainer, document.getElementById('app'));

export const createEmotionInIframe = el => {
  const {
    flush,
    hydrate,
    cx,
    merge,
    getRegisteredStyles,
    injectGlobal,
    keyframes,
    css,
    sheet,
    caches
  } = createEmotion({
    container: el
  });
  return injectGlobal; 
}

// export const {
//   flush,
//   hydrate,
//   cx,
//   merge,
//   getRegisteredStyles,
//   injectGlobal,
//   keyframes,
//   css,
//   sheet,
//   caches
// } = createEmotion({
//   container: document.getElementById('builderFrame')
// });