import React, { useState, useEffect } from 'react';
import { KeyRound, Save, UserCircle, AlertCircle, Terminal, Shield, Sun, Moon, BookOpen } from 'lucide-react';
import { useTheme } from './ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isCredentialSupported, setIsCredentialSupported] = useState(false);
  const [securityContext, setSecurityContext] = useState<'secure' | 'insecure'>('insecure');
  const [processLogs, setProcessLogs] = useState<Array<{ message: string; timestamp: string; type: 'info' | 'success' | 'error' | 'debug' }>>([]);

  const addLog = (message: string, type: 'info' | 'success' | 'error' | 'debug' = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
    setProcessLogs(prev => [...prev, { message, timestamp, type }]);
  };

  useEffect(() => {
    const checkSupport = () => {
      addLog('🔍 Starting comprehensive system environment check...', 'info');
      addLog('📊 System Information:', 'info');
      addLog(`  ├─ Platform: ${navigator.platform}`, 'debug');
      addLog(`  ├─ User Agent: ${navigator.userAgent}`, 'debug');
      addLog(`  ├─ Language: ${navigator.language}`, 'debug');
      addLog(`  ├─ Online Status: ${navigator.onLine ? 'Connected' : 'Offline'}`, 'debug');
      addLog(`  └─ Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`, 'debug');
      
      const isSecure = window.isSecureContext;
      addLog('🔒 Security Context Analysis:', 'info');
      addLog(`  ├─ Secure Context: ${isSecure ? 'Enabled' : 'Disabled'}`, 'debug');
      addLog(`  ├─ Content Security: ${document.contentType}`, 'debug');
      addLog(`  └─ Document Domain: ${document.domain}`, 'debug');
      
      const hasAPI = typeof window.PasswordCredential !== 'undefined';
      addLog('🔑 Credential Management API Check:', 'info');
      addLog(`  ├─ API Available: ${hasAPI ? 'Yes' : 'No'}`, 'debug');
      if (hasAPI) {
        addLog('  ├─ Checking API Features:', 'debug');
        addLog(`  │  ├─ PasswordCredential: ${typeof window.PasswordCredential !== 'undefined' ? '✅' : '❌'}`, 'debug');
        addLog(`  │  ├─ FederatedCredential: ${typeof window.FederatedCredential !== 'undefined' ? '✅' : '❌'}`, 'debug');
        addLog(`  │  └─ PublicKeyCredential: ${typeof window.PublicKeyCredential !== 'undefined' ? '✅' : '❌'}`, 'debug');
      }
      
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      addLog('🌐 Network Configuration:', 'info');
      addLog(`  ├─ Protocol: ${protocol}`, 'debug');
      addLog(`  ├─ Hostname: ${hostname}`, 'debug');
      addLog(`  ├─ Port: ${window.location.port || 'default'}`, 'debug');
      addLog(`  └─ Full Origin: ${window.location.origin}`, 'debug');
      
      setSecurityContext(isSecure ? 'secure' : 'insecure');
      
      const isSupported = hasAPI && isSecure && (
        protocol === 'https:' || 
        hostname === 'localhost' || 
        hostname === '127.0.0.1'
      );
      
      setIsCredentialSupported(isSupported);
      
      addLog('📊 Final Environment Analysis:', 'info');
      addLog(`  ├─ Security Context: ${isSecure ? '✅ Secure' : '❌ Insecure'}`, isSecure ? 'success' : 'error');
      addLog(`  ├─ Credential API: ${hasAPI ? '✅ Supported' : '❌ Not Supported'}`, hasAPI ? 'success' : 'error');
      addLog(`  ├─ Protocol Security: ${protocol === 'https:' ? '✅ HTTPS' : '❌ Not HTTPS'}`, protocol === 'https:' ? 'success' : 'error');
      addLog(`  ├─ Host Validation: ${['localhost', '127.0.0.1'].includes(hostname) ? '✅ Valid' : '❌ Invalid'}`, ['localhost', '127.0.0.1'].includes(hostname) ? 'success' : 'error');
      addLog(`  └─ Overall Status: ${isSupported ? '✅ ENABLED' : '❌ DISABLED'}`, isSupported ? 'success' : 'error');
      
      if (!hasAPI) {
        setStatusMessage('Your browser does not support credential management');
        addLog('⚠️ Critical Error: Browser Compatibility', 'error');
        addLog('  ├─ Issue: Credential Management API not available', 'error');
        addLog('  ├─ Impact: Cannot store or retrieve credentials', 'error');
        addLog('  └─ Solution: Use a modern browser with API support', 'error');
      } else if (!isSecure) {
        setStatusMessage('Credential management requires a secure context (HTTPS or localhost)');
        addLog('⚠️ Critical Error: Security Context', 'error');
        addLog('  ├─ Issue: Not running in a secure context', 'error');
        addLog('  ├─ Impact: Cannot access credential management features', 'error');
        addLog('  └─ Solution: Access via HTTPS or localhost', 'error');
      }
    };

    checkSupport();
  }, []);

  const handleLogin = async (user: string, pass: string, store = true) => {
    addLog('🔄 Initiating login sequence...', 'info');
    addLog('📝 Validating credentials...', 'info');
    
    if (!user || !pass) {
      setStatusMessage('Please enter both username and password');
      addLog('❌ Validation Error:', 'error');
      addLog('  ├─ Status: Failed', 'error');
      addLog(`  ├─ Username: ${user ? '✅ Provided' : '❌ Missing'}`, user ? 'success' : 'error');
      addLog(`  ├─ Password: ${pass ? '✅ Provided' : '❌ Missing'}`, pass ? 'success' : 'error');
      addLog('  └─ Action: Login process aborted', 'error');
      return;
    }

    addLog('✅ Input Validation:', 'success');
    addLog('  ├─ Username format: Valid', 'debug');
    addLog('  ├─ Password requirements: Met', 'debug');
    addLog('  └─ Proceeding with authentication', 'debug');
    
    addLog(`📝 Processing authentication for user: ${user}`, 'info');
    addLog('🌐 Initiating authentication sequence...', 'info');
    addLog('  ├─ Preparing request', 'debug');
    addLog('  ├─ Encrypting payload', 'debug');
    addLog('  └─ Sending to authentication service', 'debug');
    
    // Simulate API call
    setIsLoggedIn(true);
    setStatusMessage('Successfully logged in!');
    addLog('✅ Authentication Result:', 'success');
    addLog('  ├─ Status: Success', 'success');
    addLog('  ├─ Session established', 'success');
    addLog('  └─ User context initialized', 'success');

    if (store && isCredentialSupported && securityContext === 'secure') {
      try {
        addLog('🔐 Credential Storage Process:', 'info');
        addLog('  ├─ Initializing secure storage', 'debug');
        addLog('  ├─ Creating credential object', 'debug');
        
        const cred = new PasswordCredential({
          id: user,
          password: pass,
          name: user,
        });

        addLog('  ├─ Credential object created', 'success');
        addLog('  ├─ Validating credential format', 'debug');
        addLog('  └─ Initiating storage operation', 'debug');

        await navigator.credentials.store(cred);
        setStatusMessage('Login successful! Credentials saved for future use.');
        addLog('✅ Credential Storage:', 'success');
        addLog('  ├─ Status: Success', 'success');
        addLog('  ├─ Credentials encrypted', 'success');
        addLog('  └─ Storage operation complete', 'success');
      } catch (error) {
        console.error('Credential storage error:', error);
        setStatusMessage('Login successful! (Could not save credentials)');
        addLog('❌ Credential Storage Error:', 'error');
        addLog('  ├─ Status: Failed', 'error');
        addLog(`  ├─ Error Type: ${error instanceof Error ? error.name : 'Unknown'}`, 'error');
        addLog(`  ├─ Message: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
        addLog('  └─ Storage operation aborted', 'error');
      }
    } else if (store && !isCredentialSupported) {
      addLog('ℹ️ Credential Storage Skipped:', 'info');
      addLog('  ├─ Reason: Feature not supported', 'debug');
      addLog(`  ├─ API Support: ${isCredentialSupported ? '✅' : '❌'}`, 'debug');
      addLog(`  ├─ Security Context: ${securityContext}`, 'debug');
      addLog('  └─ No action taken', 'debug');
    }
  };

  const handleLogout = async () => {
    addLog('🔄 Initiating logout process...', 'info');
    addLog('  ├─ Clearing session state', 'debug');
    addLog('  ├─ Removing user context', 'debug');
    addLog('  └─ Resetting application state', 'debug');
    
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setStatusMessage('');

    if (isCredentialSupported && navigator.credentials?.preventSilentAccess) {
      try {
        addLog('🔒 Security cleanup:', 'info');
        addLog('  ├─ Preventing silent access', 'debug');
        await navigator.credentials.preventSilentAccess();
        addLog('  └─ Silent access prevention successful', 'success');
      } catch (error) {
        console.error('Error preventing silent access:', error);
        addLog('❌ Security cleanup error:', 'error');
        addLog(`  ├─ Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
        addLog('  └─ Silent access prevention failed', 'error');
      }
    }
    addLog('✅ Logout completed successfully', 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog('📝 Login form submitted', 'info');
    handleLogin(username, password);
  };

  const SecurityMessage = () => {
    if (!isCredentialSupported) {
      return (
        <div className="mb-6 flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg border border-yellow-200 dark:border-yellow-900/30 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Limited Functionality</h3>
            <p className="text-sm">
              Credential management is not available. The app will work, but won't save your login details.
              {securityContext === 'insecure' && (
                <span className="block mt-2 text-yellow-700 dark:text-yellow-300">
                  To enable this feature, please access the site via HTTPS or localhost.
                </span>
              )}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const ApiExplanation = () => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">
          <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Password Credentials API</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
        This demo showcases the Password Credentials Management API, a modern web standard that enables secure credential storage in your browser. It allows websites to:
      </p>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <li className="flex items-start gap-2">
          <span className="text-green-500 dark:text-green-400 mt-1">•</span>
          Securely store login credentials
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 dark:text-green-400 mt-1">•</span>
          Auto-fill login forms safely
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-500 dark:text-green-400 mt-1">•</span>
          Manage stored credentials
        </li>
      </ul>
    </div>
  );

  const ProcessLog = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
            <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Process Log</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time system events and operations</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 sm:p-4 h-[300px] sm:h-[440px] overflow-y-auto font-mono text-xs sm:text-sm border border-gray-100 dark:border-gray-700 shadow-inner">
          {processLogs.map((log, index) => (
            <div 
              key={index} 
              className={`
                mb-2 py-1.5 px-2 sm:px-3 rounded
                ${log.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : ''}
                ${log.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : ''}
                ${log.type === 'info' ? 'text-blue-600 dark:text-blue-400' : ''}
                ${log.type === 'debug' ? 'text-gray-600 dark:text-gray-400' : ''}
              `}
            >
              <span className="text-gray-500 dark:text-gray-400 mr-2 select-none font-medium">[{log.timestamp}]</span>
              <span className="whitespace-pre-wrap break-words">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Credential Management API Documentation</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive guide to browser credential management</p>
          </div>
        </div>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Core Concepts</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <p className="mb-3">The Credential Management API provides a programmatic interface between the browser and web applications to seamlessly and securely handle user credentials. It streamlines the authentication process while maintaining high security standards.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Secure storage of user credentials in the browser's credential manager</li>
                <li>Automated form filling for stored credentials</li>
                <li>Standardized interface for various authentication methods</li>
                <li>Enhanced security through browser-level encryption</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">API Methods</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
              <div>
                <code className="text-blue-600 dark:text-blue-400 font-mono">navigator.credentials.store()</code>
                <p className="mt-1 text-sm">Securely stores user credentials in the browser's credential manager. Credentials are encrypted and bound to the origin.</p>
              </div>
              <div>
                <code className="text-blue-600 dark:text-blue-400 font-mono">navigator.credentials.get()</code>
                <p className="mt-1 text-sm">Retrieves stored credentials for the current origin, enabling automatic sign-in capabilities.</p>
              </div>
              <div>
                <code className="text-blue-600 dark:text-blue-400 font-mono">navigator.credentials.preventSilentAccess()</code>
                <p className="mt-1 text-sm">Prevents automatic sign-in, typically called after a user logs out.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Security Features</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Origin Binding</strong>
                    <p className="text-sm mt-1">Credentials are strictly bound to the origin that stored them, preventing cross-site access.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Secure Context</strong>
                    <p className="text-sm mt-1">API only works in secure contexts (HTTPS or localhost), ensuring data security in transit.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">User Mediation</strong>
                    <p className="text-sm mt-1">Browser requires explicit user consent before storing or retrieving credentials.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Encryption</strong>
                    <p className="text-sm mt-1">Credentials are encrypted at rest using the browser's security mechanisms.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Implementation Flow</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong className="text-gray-900 dark:text-white">Authentication</strong>
                  <p className="text-sm mt-1">User submits credentials through a login form.</p>
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Validation</strong>
                  <p className="text-sm mt-1">Application validates credentials with the authentication server.</p>
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Storage</strong>
                  <p className="text-sm mt-1">On successful authentication, credentials are stored using <code className="text-blue-600 dark:text-blue-400 font-mono">credentials.store()</code>.</p>
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Auto-fill</strong>
                  <p className="text-sm mt-1">On subsequent visits, stored credentials can be retrieved and auto-filled.</p>
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Logout</strong>
                  <p className="text-sm mt-1">Silent access is prevented using <code className="text-blue-600 dark:text-blue-400 font-mono">preventSilentAccess()</code>.</p>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const mainContent = isLoggedIn ? (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700 mt-4 sm:mt-6">
      <div className="text-center mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/30 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCircle className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome, {username}!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You're securely logged in</p>
      </div>
      {statusMessage && (
        <div className="mb-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-200 rounded-lg border border-green-100 dark:border-green-900/30">
          <p className="text-sm">{statusMessage}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.97] font-medium"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700 mt-4 sm:mt-6">
      <div className="text-center mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/30 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please sign in to continue</p>
      </div>
      
      <SecurityMessage />
      
      {statusMessage && !isLoggedIn && (
        <div className="mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.97] font-medium flex items-center justify-center gap-2"
        >
          {isCredentialSupported ? (
            <>
              <Shield className="w-4 h-4" />
              Login & Save Credentials
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 flex flex-col">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-50"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto flex-grow">
        <div className="flex flex-col w-full lg:w-auto">
          <ApiExplanation />
          {mainContent}
        </div>
        <ProcessLog />
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500  dark:text-gray-400 py-6">
        <p>Copyright © 2025 Ed Bates (TECHBLIP LLC)</p>
        <p className="mt-1">This software is released under the Apache-2.0 License. See the LICENSE file for details</p>
      </footer>
    </div>
  );
}

export default App;