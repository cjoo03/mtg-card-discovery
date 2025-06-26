import React from 'react'

const SetsTable = ({ sets, onSetSelect, loading }) => {
  return (
    <div className="overflow-x-auto h-[70vh] w-full bg-gray-900 rounded shadow flex flex-col">
      <h2 className="text-xl font-bold mb-2 text-white">Select a Set</h2>
      {loading && <p className="text-gray-300">Loading sets...</p>}
      <table className="w-full text-left text-base text-gray-200 table-fixed">
        <thead className="bg-gray-800 sticky top-0">
          <tr>
            <th className="py-2 px-4 w-2/5">Set Name</th>
            <th className="py-2 px-4 w-1/6">Code</th>
            <th className="py-2 px-4 w-1/6">Release Date</th>
            <th className="py-2 px-4 w-1/6">Card Count</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {sets.map(set => (
            <tr
              key={set.code}
              className="hover:bg-gray-700 cursor-pointer text-lg"
              onClick={() => onSetSelect(set.code)}
            >
              <td className="py-2 px-4 border-b border-gray-800">{set.name}</td>
              <td className="py-2 px-4 border-b border-gray-800">{set.code.toUpperCase()}</td>
              <td className="py-2 px-4 border-b border-gray-800">{set.released_at}</td>
              <td className="py-2 px-4 border-b border-gray-800">{set.card_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SetsTable