import React from 'react'

const Loader = () => {
    return (
        <div className="min-w-full divide-y divide-gray-200">
            <div className="bg-gray-50 px-6 py-3">
                <div className="grid grid-cols-7 gap-4">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
            <div className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, rowIndex) => (
                    <div key={rowIndex} className="px-6 py-4">
                        <div className="grid grid-cols-7 gap-4">
                            {[...Array(7)].map((_, colIndex) => (
                                <div key={colIndex} className="h-8 bg-gray-100 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Loader
