 
## They are 6 Principles REST API's must follow:

## 1.Client Server Architecture:

REST separates the user interface from the data storage concerns. The client handles the UI and user interactions, while the server manages data and business logic. This decoupling allows each side to evolve independently and improves scalability.

## 2. Stateless:

Every request from client to server must contain all the information needed to understand and process it. The server does not store any session state between requests. This makes the system easier to scale and more reliable, since requests can be routed to any server instance.

## 3. Cacheable:

Responses must explicitly state whether they are cacheable or not. Proper caching reduces client–server interactions, improving performance and scalability. Clients (or intermediaries) can reuse responses for subsequent identical requests.

## 4. Layered System:

A client should not need to know whether it is communicating with the actual server, a proxy, or any intermediate. Layers (like load balancers, gateways, caches) can be added or changed without affecting client code, which enhances flexibility and security.

## 5. Uniform Interface:

REST enforces a consistent way to access resources, typically using standard HTTP methods (GET, POST, PUT, DELETE) and predictable URIs. This simplification improves interoperability, visibility, and decouples clients from servers.

## 6. Code on Demand:

(Optional) Servers can extend client functionality by sending executable code (like JavaScript) within responses. This allows clients to be more lightweight and adapt to new functionality, though it’s used sparingly due to security concerns.

## Route Decorators:
    
## Pipes in NEST.JS
   1. `Data Validation:` Ensures incoming request data meets expected rules and types before it reaches the route handler. like [ParseIntPipe].
   2. `Data Transformation:` Converts incoming data into the required format or type (for example, string to number).
   3. `Data Sanitization:` Cleans and filters incoming data to remove unsafe or unwanted values before processing.

## ConfigModule:
` console.log({
      TWILIO_ACCOUNT_SID : configService.get('TWILIO_ACCOUNT_SID'),
      TWILIO_AUTH_TOKEN : configService.get('TWILIO_AUTH_TOKEN'),
      TWILIO_PHONE_NUMBER : configService.get('TWILIO_PHONE_NUMBER'),
    })
`