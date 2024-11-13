import { createClient, fetchExchange, subscriptionExchange } from "urql"
import { createClient as createWebSocketClient } from "graphql-ws"

const isBrowser = typeof window !== "undefined"

// Note: updated, return for browser subscriptions and for web server data fetches.
export function getUrqlClient() {
  const exchanges = [fetchExchange]
  if (isBrowser) {
    const webSocketClient = createWebSocketClient({
      url: "ws://next-werewolf-59.hasura.app/v1/graphql",
    })
    exchanges.push(
      subscriptionExchange({
        forwardSubscription(request) {
          const input = { ...request, query: request.query || "" }
          return {
            subscribe(sink) {
              const unsubscribe = webSocketClient.subscribe(input, sink)
              return { unsubscribe }
            },
          }
        },
      }),
    )
  }
  return createClient({
    url: "https://next-werewolf-59.hasura.app/v1/graphql",
    exchanges,
  })
}
