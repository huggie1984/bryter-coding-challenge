import { createContext, ReactNode, useContext } from "react"
import { createClient, fetchExchange, subscriptionExchange, Provider as UrqlProvider } from "urql"
import { createClient as createWebSocketClient } from "graphql-ws"
import WebSocket from "ws"

const urqlContext = createContext(null)

const webSocketClient = createWebSocketClient({
  url: "ws://next-werewolf-59.hasura.app/v1/graphql",
  webSocketImpl: WebSocket,
})

const urqlClient = createClient({
  url: "https://next-werewolf-59.hasura.app/v1/graphql",
  exchanges: [
    fetchExchange,
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
  ],
})

export const UrqlProviderWrapper = ({ children }: { children: ReactNode }) => (
  <UrqlProvider value={urqlClient}>{children}</UrqlProvider>
)

export const useUrqlClient = () => useContext(urqlContext)
