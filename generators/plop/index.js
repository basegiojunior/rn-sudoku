module.exports = plop => {
  const promptInputGetName = message => ({
    type: 'input',
    name: 'name',
    message,
  });

  const actionAddFromTemplate = (sourcePath, destinationPath) => ({
    type: 'add',
    path: destinationPath,
    templateFile: sourcePath,
    skipIfExists: true,
  });

  // Destination Paths
  const srcDestinationPath = '../../src';
  const componentDestinationPath = `${srcDestinationPath}/components/{{pascalCase name}}`;
  const pageDestinationPath = `${srcDestinationPath}/pages/{{pascalCase name}}`;
  const storeDestinationPath = `${srcDestinationPath}/stores`;

  // Source Paths
  const templateFolder = './templates';
  const componentSourcePath = `${templateFolder}/component`;
  const pageSourcePath = `${templateFolder}/page`;
  const storeSourcePath = `${templateFolder}/store`;

  const generators = [
    {
      name: 'Component',
      object: {
        description:
          'This is a Skeleton Component with styles, types and tests',
        prompts: [promptInputGetName('Component name?')],
        actions: [
          actionAddFromTemplate(
            `${componentSourcePath}/index.tsx.hbs`,
            `${componentDestinationPath}/index.tsx`,
          ),
          actionAddFromTemplate(
            `${componentSourcePath}/Name.tsx.hbs`,
            `${componentDestinationPath}/{{pascalCase name}}.tsx`,
          ),
          actionAddFromTemplate(
            `${componentSourcePath}/style.ts.hbs`,
            `${componentDestinationPath}/{{pascalCase name}}.style.ts`,
          ),
          actionAddFromTemplate(
            `${componentSourcePath}/test.tsx.hbs`,
            `${componentDestinationPath}/{{pascalCase name}}.test.tsx`,
          ),
          actionAddFromTemplate(
            `${componentSourcePath}/types.ts.hbs`,
            `${componentDestinationPath}/{{pascalCase name}}.types.ts`,
          ),
        ],
      },
    },
    {
      name: 'Page',
      object: {
        description: 'This is a Skeleton Page with styles',
        prompts: [promptInputGetName('Page name?')],
        actions: [
          actionAddFromTemplate(
            `${pageSourcePath}/index.tsx.hbs`,
            `${pageDestinationPath}/index.tsx`,
          ),
          actionAddFromTemplate(
            `${pageSourcePath}/Name.tsx.hbs`,
            `${pageDestinationPath}/{{pascalCase name}}.tsx`,
          ),
          actionAddFromTemplate(
            `${pageSourcePath}/style.ts.hbs`,
            `${pageDestinationPath}/{{pascalCase name}}.style.ts`,
          ),
        ],
      },
    },
    {
      name: 'Store',
      object: {
        description: 'This is a Skeleton store with zustand',
        prompts: [promptInputGetName('Store name?')],
        actions: [
          actionAddFromTemplate(
            `${storeSourcePath}/store.ts.hbs`,
            `${storeDestinationPath}/{{camelCase name}}Store.ts`,
          ),
        ],
      },
    },
  ];

  generators.forEach(generator => {
    plop.setGenerator(generator.name, generator.object);
  });
};
