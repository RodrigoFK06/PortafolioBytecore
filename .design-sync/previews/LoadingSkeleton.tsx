import { Card, CardContent, LoadingSkeleton } from "arkos-portfolio"

// `lines` defaults to 3 and each bar gets a deterministic 60–99% width, so the
// skeleton needs a bounded container to read as a paragraph placeholder.

export const PorDefecto = () => (
  <div className="max-w-md">
    <LoadingSkeleton />
  </div>
)

export const Lineas = () => (
  <div className="max-w-md space-y-8">
    <LoadingSkeleton lines={1} />
    <LoadingSkeleton lines={5} />
  </div>
)

export const EnCard = () => (
  <Card className="max-w-sm">
    <CardContent className="pt-6">
      <LoadingSkeleton lines={4} />
    </CardContent>
  </Card>
)
