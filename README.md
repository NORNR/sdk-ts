# @nornr/sdk

TypeScript SDK for [NORNR](https://nornr.com) — spend governance for AI agents.

NORNR sits between agent intent and real settlement. Policy decides approved / queued / blocked. Every decision leaves a signed audit trail.

---

## Install

```bash
npm install @nornr/sdk
```

---

## Quickstart

```ts
import { Wallet } from "@nornr/sdk";

const wallet = await Wallet.create({
  owner: "research-agent",
  dailyLimit: 100,
  requireApprovalAbove: 25,
  baseUrl: "https://nornr.com",
});

const decision = await wallet.pay({
  amount: 12.50,
  to: "openai",
  purpose: "model inference",
});

if (decision.requiresApproval) {
  await wallet.approveIfNeeded(decision);
}
```

---

## Connect an existing workspace

```ts
const wallet = await Wallet.connect({
  apiKey: process.env.NORNR_API_KEY,
  agentId: "agent_abc123",
});
```

---

## Works with your agent framework

```ts
// OpenAI Agents SDK
import { createOpenAIAgentsTools } from "@nornr/sdk";
const tools = createOpenAIAgentsTools(wallet);

// LangChain
import { createLangChainTools } from "@nornr/sdk";
const tools = createLangChainTools(wallet);
```

---

## Full client

```ts
import { AgentPayClient } from "@nornr/sdk";

const client = new AgentPayClient({ baseUrl: "https://nornr.com" })
  .withApiKey(process.env.NORNR_API_KEY);

// Intents
await client.createPaymentIntent({ agentId, amountUsd, counterparty, purpose });

// Approvals
await client.listApprovals();

// Budget controls
await client.createBudgetCap({ dimension: "team", value: "growth", limitUsd: 500, action: "queue" });

// Audit
await client.exportAudit();
await client.getCostReport();
await client.getMonthlyStatement();

// Anomalies
await client.listAnomalies();
```

---

## Links

- [nornr.com](https://nornr.com)
- [Control room](https://nornr.com/app)
- [Python SDK](https://github.com/NORNR/sdk-py)

---

## License

MIT
