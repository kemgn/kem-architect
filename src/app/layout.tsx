import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.scss"
import "../app/(components)/_ComponentStyles/globalstyles.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { theme } from "@/app/themes";
import Header from "./(components)/Header/Header";
import SideMenu from "./(components)/SideMenu/SideMenu";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "./layout.module.css";
import SSRFlickerFix from "./(components)/SSRFlickerFix/SSRFlickerFix";
import {
    Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import { LanguagesProvider } from "@/app/(components)/_Contexts/LanguagesContext";
import ToastAlertProvider from "@/ToastAlertProvider";
// import { IDEProvider } from "./(components)/IDE/IDEContext";
import { ArchitectDataProvider } from "./(components)/_Contexts/ArchitectDataContext";
import "../../public/IDE/plugin3.css";
import Script from "next/script";
import IdeModal from "./(components)/IDE/IDE";
import { IDEProvider } from "../../public/IDE/IDEContext";
import { useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });

const ARCHITECT_TITLE = "Architect";
const ARCHITECT_DESCRIPTION = "Architect for IMS";
const ARCHITECT_LANGUAGE = "en";

export const metadata: Metadata = {
    title: ARCHITECT_TITLE,
    description: ARCHITECT_DESCRIPTION,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang={ARCHITECT_LANGUAGE}>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
                <Script id="" type="module">
                
                    {
                    `
                        import { initIdeFn, getCodeFn } from "/IDE/plugin.js";
                        window.initIdeFn    = initIdeFn;
                        window.getIdeCodeFn = getCodeFn;
                    `
                    }
                </Script>
            </head>
            <body className={inter.className}>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <LanguagesProvider>
                        <IDEProvider>
                            <CssVarsProvider theme={theme} defaultMode="dark">
                                <CssBaseline>
                                    <SSRFlickerFix />
                                    <Header />
                                    <ToastAlertProvider>
                                        <ArchitectDataProvider>
                                            <div className={`${styles.mainContainer} grid`}>
                                                <SideMenu />
                                                <main className={styles.main}>
                                                    {children}
                                                </main>
                                            </div>
                                        </ArchitectDataProvider>
                                    </ToastAlertProvider>
                                </CssBaseline>
                            </CssVarsProvider>
                            <IdeModal />

                        </IDEProvider>
                    </LanguagesProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
