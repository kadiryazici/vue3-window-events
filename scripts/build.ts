import execa, { Options } from 'execa';

import fse from 'fs-extra';
import { join } from 'path';

async function main() {
   const root = process.cwd();
   const dist = join(root, 'dist');
   if (await fse.pathExists(dist)) {
      await fse.rm(dist, { recursive: true });
   }

   await execute('npm', ['run', 'script:build']);
   await sleep(300);
   await refactorTypes();
}

function execute(command: string, commandArguments: string[], options?: Options) {
   return execa(command, commandArguments, {
      stdio: 'inherit',
      ...options
   });
}

function sleep(ms: number): Promise<void> {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve();
      }, ms);
   });
}

async function refactorTypes() {
   const dist = join(process.cwd(), 'dist');
   const basePath = join(dist, 'src');
   const targetPath = join(dist, 'types');

   if (await fse.pathExists(basePath)) {
      await fse.move(basePath, targetPath);
      return;
   }
   throw new Error('types folder does not exist');
}

main();
