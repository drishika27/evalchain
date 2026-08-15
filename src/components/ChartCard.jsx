import React from 'react'
import Card, { CardHeader } from './Card.jsx'

export default function ChartCard({ title, subtitle, action, children, height = 280 }) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <div className="px-3 py-4 sm:px-5" style={{ height }}>
        {children}
      </div>
    </Card>
  )
}
