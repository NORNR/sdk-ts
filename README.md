# @nornr/sdk

TypeScript SDK for [NORNR](https://nornr.com) — spend governance for AI agents.

NORNR gives your agents a mandate before they spend. Policy decides approved / queued / blocked. Every decision gets a signed receipt. Your agent acts on the decision using its own payment rails.

---

## Install

```bash
npm install @nornr/sdk
```

---

## How it works

```
agent calls wallet.pay()
        ↓
NORNR evaluates against policy
        ↓
decision: approved / queued / blocked
        ↓
agent acts on the decision
using its own API keys and payment methods
        ↓
signed receipt + audit trail recorded
```

NORNR does not move money. It governs whether money should move, records that it did, and proves it afterward.

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

if (decision.status === "approved") {
  // Mandate granted — proceed with your actual API call
  await openai.chat.completions.create({ model: "gpt-4o", messages });
} else if (decision.requiresApproval) {
  // Above threshold — queued for human approval
  await wallet.approveIfNeeded(decision);
} else {
  // Blocked by policy
  console.log("Spend blocked:", decision.reasons);
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

## On-chain settlement (optional)

NORNR supports optional on-chain USDC settlement via Base for teams that want
cryptographic proof of transfer in addition to the signed audit trail.
This is not required for governance to work — most teams use NORNR with
their existing payment infrastructure.

---

## Links

- [nornr.com](https://nornr.com)
- [Control room](https://nornr.com/app)
- [Python SDK](https://github.com/NORNR/sdk-py)

---

## License

MIT
