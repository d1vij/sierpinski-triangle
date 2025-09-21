import {defineConfig} from "vite";
export default defineConfig({
    build:{
        rollupOptions:{
            input:{
                main: "index.html",
                circle:"circle/index.html",
                triangle:"triangle/index.html",
                "n-polygon":"n-polygon/index.html",
            }
        }
    }
})