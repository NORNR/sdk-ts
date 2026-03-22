# @nornr/sdk

TypeScript SDK for [NORNR](https://nornr.com), the control plane for agent spend that needs policy, review, and evidence before money moves.

NORNR sits between spend intent and settlement. It decides whether an action should happen, routes riskier actions into review, and leaves behind one defended record for finance, risk, and audit afterward.

`AgentPayClient` remains the underlying client name for backward compatibility. `Wallet` is the high-level facade for existing code. The preferred mental model is still control-plane-first: start with one spend lane, not every surface at once.

The TypeScript SDK is now treated as an official NORNR product surface, not just a thin convenience wrapper. The release rule is simple: policy authoring, counterparty memory, review, proof, finance, and emergency-control surfaces ship behind one shared SDK surface contract across Python and TypeScript.

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

## Start Here

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

## Recommended First Lanes

Start with exactly one of these:

1. `Wallet.pay(...)` to prove one governed runtime decision
2. browser-side paid actions where the SDK sits before checkout or vendor execution
3. MCP or operator review paths where autonomous requests must queue before spend moves

The goal is not to learn every surface at once.
The goal is to prove one lane, one review path, and one defended record.

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

## Official product surfaces

The TypeScript client now covers the same core operator surfaces that ship in the Python SDK:

- policy packs and policy authoring drafts
- counterparty registry and scope-bound approvals
- audit review and finance close packets
- emergency controls, approval chains, and hardware bindings
- weekly review, policy workbench, and intent timeline

```ts
const drafts = await client.listPolicyAuthoringDrafts();
const counterparties = await client.listCounterpartyProfiles();
const review = await client.getAuditReview();
const financePacket = await wallet.financePacket();
```

The goal is not to memorize every method. The goal is that both SDKs expose the same official control surfaces when teams build their first governed lane.

## Release discipline

Cross-SDK rollout is gated by the shared surface contract in:

- `config/sdk-surface-contract.json`
- `tests/sdk-surface-parity-phase70.test.js`

If one SDK gets a new official operator surface, the other SDK must land the matching public method before the rollout is considered complete.

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
