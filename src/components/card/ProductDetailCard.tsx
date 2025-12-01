

export const ProductDetailCard = ({site,onEdit}) => {
  return (
       <button
       onClick={()=>onEdit(site)}
              key={site.siteId}
              className={`
                relative p-4 rounded-lg border text-left transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-gray-300/70 hover:-translate-y-0.5
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  
                  <h3 className="font-semibold text-gray-900">{site.siteName} ({site.siteId})</h3>
                  {site.siteDomain && (
                    <p className="text-sm text-gray-500 mt-1">
                      {site.siteDomain} 
                    </p>
                  )}
                  {site.status && (
                    <span
                      className={`
                      inline-block mt-2 px-2 py-0.5 text-xs rounded-full
                      ${
                        site.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                    >
                      {site.status}
                    </span>
                  )}
                </div>
              </div>
            </button>
  )
}