"use client";

import React, {useEffect} from 'react';

export default function DashboardPage() {
  const [data, setData] = React.useState<Array<{ id: number; productName: string }>>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/get`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.productName}</li>
        ))}
      </ul>
    </div>
  );
}
