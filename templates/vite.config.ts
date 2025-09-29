import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import userConfig from './widget-3dx.config.json';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  {
    name: 'xhtml-doctype',
    apply: 'build',
    transformIndexHtml(html) {
      const xmlVersion = '<?xml version="1.0" encoding="utf-8"?>';
      const withDoctype = html.replace(
        /<!doctype html>/i,
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
      );
      const withNamespaces = withDoctype.replace(
        '<html',
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:widget="http://www.netvibes.com/ns/"'
      );
      return `${xmlVersion}\n${withNamespaces}`;
    },
  }
  ],
  base: './',
  define: {
    __USER_CONFIG__: JSON.stringify(userConfig),
  },
  build: {
    sourcemap: "inline"
  }
})
