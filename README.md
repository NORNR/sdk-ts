# @nornr/sdk

TypeScript SDK for [NORNR](https://nornr.com) - mandates, approvals, and evidence for autonomous agents.

NORNR gives your agents a mandate before they spend. Policy decides `approved`, `queued`, or `blocked`. Every decision gets a signed receipt. Your agent then acts on the decision using its own payment rails.

`AgentPayClient` remains the underlying client name for backward compatibility. `Wallet` is the high-level facade most developers should start with.

---

## Install

Public package:

```bash
npm install @nornr/sdk
```

From this repo during local development:

```bash
npm install ./packages/sdk-ts
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
  amount: 12.5,
  to: "openai",
  purpose: "model inference",
});

if (decision.status === "approved") {
  // Mandate granted - proceed with the real action.
  await openai.chat.completions.create({ model: "gpt-4o", messages });
} else if (decision.requiresApproval) {
  // Queued for human approval.
  await wallet.approveIfNeeded(decision);
} else {
  console.log("Spend blocked:", decision.reasons);
}
```

If the decision is approved and you are using a configured settlement adapter:

```ts
await wallet.settle();
```

---

## Connect an existing workspace

```ts
import { Wallet } from "@nornr/sdk";

const wallet = await Wallet.connect({
  apiKey: process.env.NORNR_API_KEY,
  agentId: "agent_abc123",
  baseUrl: "https://nornr.com",
});
```

---

## Framework-agnostic usage

Use the `Wallet` facade inside whatever TypeScript or JavaScript agent framework you already run. NORNR governs whether the action should happen; your framework still owns the actual API call or task execution.

```ts
const decision = await wallet.pay({
  amount: 5,
  to: "openai",
  purpose: "model inference",
});

if (decision.status === "approved") {
  await runYourAgentStep();
}
```

---

## Full client

```ts
import { AgentPayClient } from "@nornr/sdk";

const publicClient = new AgentPayClient({ baseUrl: "https://nornr.com" });
const onboarding = await publicClient.onboard({
  workspaceName: "Atlas Agents",
  agentName: "research-agent",
  dailyLimitUsd: 50,
  requireApprovalOverUsd: 20,
});

const client = publicClient.withApiKey(onboarding.apiKey.key);

await client.createPaymentIntent({
  agentId: onboarding.agent.id,
  amountUsd: 5,
  counterparty: "openai",
  purpose: "model inference",
});

await client.listApprovals();
await client.createBudgetCap({
  dimension: "team",
  value: "growth",
  limitUsd: 500,
  action: "queue",
});
await client.exportAudit();
await client.getCostReport();
await client.getMonthlyStatement();
await client.listAnomalies();
```

---

## Optional settlement

NORNR can optionally execute on-chain USDC settlement through a configured rail adapter. Most teams start by using NORNR as the control layer above their existing payment infrastructure.

---

## Links

- [nornr.com](https://nornr.com)
- [Control room](https://nornr.com/app)
- [Python SDK](https://github.com/NORNR/sdk-py)

---

## License

MIT
