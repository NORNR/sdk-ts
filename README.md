# NORNR TypeScript SDK

Teknisk not:
SDK-klassen heter fortfarande `AgentPayClient` tills vidare for bakatkompatibilitet.

```ts
import { AgentPayClient } from "./index.js";

const publicClient = new AgentPayClient({
  baseUrl: "http://127.0.0.1:3000"
});

const onboarding = await publicClient.onboard({
  workspaceName: "Atlas Agents",
  agentName: "research-agent",
  dailyLimitUsd: 50
});

const client = publicClient.withApiKey(onboarding.apiKey.key);

const bootstrap = await client.getBootstrap();

await client.updateIdentity({
  legalName: "Atlas Agents AB",
  contactEmail: "owner@atlasagents.ai",
  jurisdiction: "SE"
});

await client.createDeposit({
  amountUsd: 25,
  source: "bank-transfer"
});

await client.createPaymentIntent({
  agentId: bootstrap.agents[0].id,
  amountUsd: 5,
  counterparty: "openai",
  purpose: "model inference"
});

const agreement = await client.createAgreement({
  buyerAgentId: bootstrap.agents[0].id,
  title: "Dataset scrape engagement",
  counterpartyName: "scraper-agent",
  counterpartyDestination: "agent-b-wallet",
  milestones: [
    { title: "Collect URLs", amountUsd: 12 },
    { title: "Normalize output", amountUsd: 8 }
  ]
});

await client.submitMilestoneProof(
  agreement.agreement.id,
  agreement.agreement.milestones[0].id,
  { summary: "Output bundle uploaded" }
);

await client.releaseMilestone(
  agreement.agreement.id,
  agreement.agreement.milestones[0].id
);

await client.runSettlement();

const reputation = await client.getReputation();
const portableReputation = await client.getPortableReputation();
const signedPortableReputation = await client.getSignedPortableReputation();
const directory = await client.getEcosystemDirectory();
const agreementStandard = await client.exportAgreementStandard();
const signedAgreementStandard = await client.exportSignedAgreementStandard();
const signedDirectory = await client.getSignedEcosystemDirectory();
const validation = await client.validateInteropEnvelope(signedPortableReputation);
await client.createWebhook({
  label: "simulated-outbox",
  url: "simulate://agentpay",
  events: ["payment_intent.settled"]
});
const events = await client.listEvents();
const deliveries = await client.listWebhookDeliveries();
const auditExport = await client.exportAudit();
```
