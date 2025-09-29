#!/usr/bin/env node

import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const appName = process.argv[2] || 'vite-3dx-app';
const appPath = resolve(process.cwd(), appName);
const templatePath = join(__dirname, 'templates');

function copyRecursive(srcDir, destDir) {
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  for (const item of readdirSync(srcDir)) {
    const src = join(srcDir, item);
    const dest = join(destDir, item);
    if (statSync(src).isDirectory()) {
      copyRecursive(src, dest);
    } else {
      copyFileSync(src, dest);
    }
  }
}

try {
  console.log(`📁 Criando projeto ${appName} com Vite + React + TypeScript...`);
  const output = execSync(`npm create vite@latest ${appName} -- --template react-ts`, { stdio: 'pipe' });
} catch (err) {
  console.error('❌ Erro ao criar o projeto:', err.message);
  process.exit(1);
}

console.log(`📦 Instalando dependências...`);
process.chdir(appPath);
execSync(`npm install @mui/material @emotion/react @emotion/styled widget-3dx-react`, { stdio: 'inherit' });

console.log(`📄 Copiando arquivos de template...`);
copyRecursive(templatePath, appPath);


console.log(`\n🎉 Projeto "${appName}" finalizado com sucesso!`);
console.log(`👉 Para começar:\n`);
console.log(`   cd ${appName}`);
console.log(`   npm run dev\n`)


