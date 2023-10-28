export const loadAsyncJs = (jsLink: string) =>
  new Promise((resolve, reject) => {
    const jsElm = document.createElement('script');
    jsElm.type = 'application/javascript';
    jsElm.src = jsLink;
    document.body.appendChild(jsElm);
    jsElm.onload = () => {
      resolve(jsLink);
    };
    jsElm.onerror = reject;
  });

export const loadAsyncCSS = (href: string) =>
  new Promise((resolve, reject) => {
    if (typeof document !== 'undefined') {
      const styleCSS = document.createElement('link');
      styleCSS.rel = 'stylesheet';
      styleCSS.href = href;
      const lastChild =
        document.head.childNodes.length > 0
          ? document.head.childNodes[document.head.childNodes.length - 1]
          : null;

      document.head.insertBefore(
        styleCSS,
        lastChild ? lastChild.nextSibling : null
      );

      styleCSS.onload = resolve;
      styleCSS.onerror = reject;
    } else {
      reject(new Error('The document object is not available.'));
    }
  });
