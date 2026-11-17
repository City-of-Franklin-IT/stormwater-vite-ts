<p>Vite and TypeScript built React application utilized by Stormwater to track site inspections and stormwater related violations.  Replaces JavaScript version.</p>

<h1>Deployed</h1>
<a href="https://dev.franklintn.gov/stormwater/" target="_blank">https://dev.franklintn.gov/stormwater/</a><br><br>

<h1>API</h1>
https://api.franklin-gov.com/api/v2/eng | <a href="https://github.com/City-of-Franklin-IT/eng-api-ts" target="_blank">GitHub</a><br>
https://dev.franklintn.gov/api/v2/eng <em>Proxy</em><br>
<a href="https://dev.franklintn.gov/api/v2/eng/api-docs" target="_blank">API Docs</a><br><br>

<h1>Database</h1>
[COFDBV08].[stormwater]<br><br>

<h1>Configuration</h1>
All settings live in <code>src/config.ts</code> (app base, title, Entra client ids, auth URIs, API URLs and the dev-only mock token). No <code>.env</code> files are used. Import values with <code>import { API_URL } from "@/config"</code>.<br><br>

<h1>Authentication</h1>
Azure MSAL (<code>@azure/msal-browser</code>). <code>AuthProvider</code> (<code>src/context/Auth/hooks/AuthProvider.tsx</code>) initializes the MSAL instance; <code>AuthCtxProvider</code> (<code>src/context/Auth/index.tsx</code>) acquires an <strong>access token</strong> for the <code>${ ENTRA_CLIENT_ID }/.default</code> scope via <code>acquireTokenSilent</code>, falling back to a popup and then a login redirect. The token is exposed through <code>useAuth()</code> and refreshed on tab focus and on any <code>401</code> response (<code>withTokenRefresh</code>).<br><br>

In development (<code>import.meta.env.DEV</code>) the MSAL flow is bypassed and <code>MOCK_TOKEN</code> is used instead.
