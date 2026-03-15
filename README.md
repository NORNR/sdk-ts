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
const policyTemplates = await client.listPolicyTemplates();
const apiKeyTemplates = await client.listApiKeyTemplates();
const caps = await client.listBudgetCaps();

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
  destination: "0x1111111111111111111111111111111111111111",
  budgetTags: {
    team: "growth",
    project: "agent-wallet-rollout",
    customer: "atlas-enterprise",
    costCenter: "ai-rnd"
  },
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
  label: "slack-approvals",
  url: "simulate://slack-approvals",
  deliveryMode: "slack",
  publicBaseUrl: "http://127.0.0.1:3000",
  events: ["approval.created"]
});
const events = await client.listEvents();
const deliveries = await client.listWebhookDeliveries();
const auditExport = await client.exportAudit();
const costReport = await client.getCostReport();
const costReportCsv = await client.exportCostReport("csv");
const scopedKey = await client.createApiKey({
  label: "observer-key",
  templateId: "observer"
});
const rotatedKey = await client.rotateApiKey(scopedKey.id);
await client.createBudgetCap({
  dimension: "team",
  value: "growth",
  limitUsd: 100,
  action: "queue"
});
const simulation = await client.simulatePolicy({
  agentId: bootstrap.agents[0].id,
  templateId: "production_guarded"
});
const policyDiff = await client.diffPolicy({
  agentId: bootstrap.agents[0].id,
  templateId: "production_guarded",
  mode: "shadow"
});
const anomalies = await client.listAnomalies();
const statement = await client.getMonthlyStatement();
```
