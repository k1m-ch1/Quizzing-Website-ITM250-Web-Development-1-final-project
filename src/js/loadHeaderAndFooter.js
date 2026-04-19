// need to dynamically load footer

const pathPrefix = window.location.pathname.startsWith('/src/') ? '/src' : '';

injectContent(`${pathPrefix}/nav.html`, 'nav');
injectContent(`${pathPrefix}/footer.html`, 'footer');
