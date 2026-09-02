<p>Vite and TypeScript built React application utilized by Stormwater to track site inspections and stormwater related violations.  Replaces JavaScript version.</p>

<h1>Deployed</h1>
<a href="https://dev.franklintn.gov/stormwater/" target="_blank">https://dev.franklintn.gov/stormwater/</a><br><br>

<h1>API</h1>
https://api.franklin-gov.com/api/v2/eng | <a href="https://github.com/City-of-Franklin-IT/eng-api-ts" target="_blank">GitHub</a><br>
https://dev.franklintn.gov/api/v2/eng <em>Proxy</em><br>
<a href="https://dev.franklintn.gov/api/v2/eng/api-docs" target="_blank">API Docs</a><br><br>

<h1>Database</h1>
[COFDBV08].[stormwater]<br><br>

<h1>Environment</h1>
Copy <code>.env.example</code> to <code>.env</code> and <code>.env.development.example</code> to <code>.env.development</code>, then fill in the values. Both are git-ignored.<br><br>

<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td><code>VITE_APP_BASE</code></td><td>Router base path (<code>/stormwater</code>)</td></tr>
<tr><td><code>VITE_APP_TITLE</code></td><td>Application title</td></tr>
<tr><td><code>VITE_CLIENT_ID</code></td><td>Entra app registration (SPA) client id</td></tr>
<tr><td><code>VITE_ENTRA_CLIENT_ID</code></td><td>eng-api-ts's Entra API app registration id, used to build the <code>.default</code> scope</td></tr>
<tr><td><code>VITE_AUTH_AUTHORITY</code></td><td>Entra authority URL</td></tr>
<tr><td><code>VITE_AUTH_REDIRECT_URI</code></td><td>Post-login redirect URI</td></tr>
<tr><td><code>VITE_AUTH_POST_LOGOUT_REDIRECT_URI</code></td><td>Post-logout redirect URI</td></tr>
<tr><td><code>VITE_API_URL</code></td><td>Stormwater API base (<code>/api/v2/eng/stormwater</code>)</td></tr>
<tr><td><code>VITE_ACTIVE_SITES_URL</code></td><td>Public active-sites endpoint</td></tr>
<tr><td><code>VITE_MOCK_TOKEN</code></td><td><em>(.env.development only)</em> Token used in place of a real Entra access token when running <code>npm run dev</code></td></tr>
</table><br>

Variable names are typed in <code>src/vite-env.d.ts</code>.<br><br>

<h1>Authentication</h1>
Azure MSAL (<code>@azure/msal-browser</code>). <code>AuthProvider</code> (<code>src/context/Auth/hooks/AuthProvider.tsx</code>) initializes the MSAL instance; <code>AuthCtxProvider</code> (<code>src/context/Auth/index.tsx</code>) acquires an <strong>access token</strong> for the <code>${ VITE_ENTRA_CLIENT_ID }/.default</code> scope via <code>acquireTokenSilent</code>, falling back to a popup and then a login redirect. The token is exposed through <code>useAuth()</code> and refreshed on tab focus and on any <code>401</code> response (<code>withTokenRefresh</code>).<br><br>

In development (<code>import.meta.env.DEV</code>) the MSAL flow is bypassed and <code>VITE_MOCK_TOKEN</code> is used instead.
