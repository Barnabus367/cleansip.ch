import debugShopifyData from 'lib/debug-shopify';

export default async function DebugPage() {
  const debugResults = await debugShopifyData();
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#003B46]">
          🔍 CleanSip Shopify Debug
        </h1>
        
        <div className="space-y-6">
          
          {/* Status Overview */}
          <div className="bg-gray-50 p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Shopify Connection:</span> 
                <span className={debugResults.success ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                  {debugResults.success ? '✅ Connected' : '❌ Failed'}
                </span>
              </div>
              <div>
                <span className="font-medium">Products Found:</span> 
                <span className="text-blue-600 ml-2">{debugResults.totalProducts || 0}</span>
              </div>
            </div>
          </div>
          
          {/* Data Summary */}
          {debugResults.success && (
            <div className="bg-green-50 border border-green-200 p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Data Summary</h2>
              <div className="space-y-2">
                <p><strong>Featured Products:</strong> {debugResults.featuredProducts}</p>
                <p><strong>Processed for UI:</strong> {debugResults.processedProducts}</p>
                <p><strong>Status:</strong> All required data is available ✅</p>
              </div>
            </div>
          )}
          
          {/* Error Display */}
          {!debugResults.success && (
            <div className="bg-red-50 border border-red-200 p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-2">❌ Connection Error</h2>
              <p className="text-red-700">{debugResults.error}</p>
              <div className="mt-4">
                <h3 className="font-medium text-red-800">Check:</h3>
                <ul className="list-disc list-inside text-red-700 text-sm mt-2">
                  <li>SHOPIFY_STORE_DOMAIN in .env.local</li>
                  <li>SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local</li>
                  <li>Network connectivity</li>
                </ul>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
