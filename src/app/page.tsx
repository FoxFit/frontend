'use client'

import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, Resource, localStorageStore } from 'react-admin';

import AuthProvider from '@/providers/AuthProvider';
import { Dashboard } from '@/components/dashboard';
import englishMessages from '@/i18n/en';
import { Layout, Login } from '@/layout';
import { darkTheme, lightTheme } from '@/layout/themes';
import visitors from '@/components/visitors';

import dynamic from "next/dynamic";
import simpleRestProvider from "ra-data-simple-rest";
import { API_URL } from "@/constants"

const i18nProvider = polyglotI18nProvider(
    locale => {
        if (locale === 'fr') {
            return import('@/i18n/fr').then(messages => messages.default);
        }

        // Always fallback on english.
        return englishMessages;
    },
    'en',
    [
        { locale: 'en', name: 'English' },
        { locale: 'fr', name: 'Français' },
    ]
);

import httpClient from '@/providers/HttpClient';
const dataProvider = simpleRestProvider(API_URL, httpClient);

const App = () => (
    <Admin
        title=""
        dataProvider={dataProvider}
        store={localStorageStore(undefined, 'ECommerce')}
        authProvider={AuthProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={Layout}
        i18nProvider={i18nProvider}
        disableTelemetry
        theme={lightTheme}
        darkTheme={darkTheme}
        defaultTheme="light"
    >
        {/*<CustomRoutes>*/}
        {/*    <Route path="/segments" element={<Segments />} />*/}
        {/*</CustomRoutes>*/}
        <Resource name="customers" {...visitors} />
        {/*<Resource name="commands" {...orders} options={{ label: 'Orders' }} />*/}
        {/*<Resource name="invoices" {...invoices} />*/}
        {/*<Resource name="products" {...products} />*/}
        {/*<Resource name="categories" {...categories} />*/}
        {/*<Resource name="reviews" {...reviews} />*/}
    </Admin>
);

export default dynamic(() => Promise.resolve(App), {
    ssr: false,
});