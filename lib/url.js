export function generateUrl(queue, params = {}) {
  const hrefParams = new URLSearchParams({
    prefix: queue.prefix,
    queue: queue.name,
    ...params
  }).toString()

  const asParams = new URLSearchParams(params).toString()

  return {
    href: `/queue?${hrefParams}`,
    as: `/queues/${queue.prefix}/${queue.name}${asParams ? `?${asParams}` : ''}`
  }
}
