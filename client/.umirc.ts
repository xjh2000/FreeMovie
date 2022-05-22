import {defineConfig} from "umi";

export default defineConfig({
    npmClient: "pnpm",
    history: {type: "hash"},
    proxy: {
        "/api": {
            target: "http://localhost:8080",
            changeOrigin: true,
        },
    },

    dva: {immer: {}},
    plugins: ["@umijs/plugins/dist/dva"],
});
