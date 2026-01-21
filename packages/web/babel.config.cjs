module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { jsx: 'react' }],
  ],
  plugins: [
    function transformImportMeta() {
      return {
        visitor: {
          MemberExpression(path) {
            if (
              path.node.object.type === 'MetaProperty' &&
              path.node.object.meta.type === 'Identifier' &&
              path.node.object.meta.name === 'import' &&
              path.node.object.property.type === 'Identifier' &&
              path.node.object.property.name === 'meta' &&
              path.node.property.type === 'Identifier' &&
              path.node.property.name === 'env' &&
              path.parent.type === 'MemberExpression'
            ) {
              const envVar = path.parent.property.name;
              const value = envVar === 'VITE_API_URL' ? "'http://localhost:3000'" : 'undefined';
              path.parentPath.replaceWithSourceString(value);
            }
          },
        },
      };
    },
  ],
};
