# NORNR

**Mandates, approvals and evidence for autonomous agents.**

When agents start initiating real economic actions - buying API calls, paying vendors, booking resources - it is not enough that money can move. You need to decide which agent can spend, how much, against whom, and have a defensible trail when someone asks why.

NORNR is the control layer between agent intent and real settlement.
Today the primary commercial model is subscription software. Optional settlement fees only apply when NORNR itself executes the settlement rail.

---

![NORNR Control Room](./docs/assets/control-room.png)

## What NORNR does

```text
Agent wants to spend  ->  Policy engine evaluates  ->  Approved / Queued / Blocked
                                                             |
                                                             v
                                                   Ledger records it
                                                   Receipt is generated
                                                   Audit trail is signed
```

- **Policy engine** - set limits, approval thresholds, counterparty allowlists, and anomaly triggers
- **Approval queue** - human-in-the-loop when it matters, automated when it does not
- **Signed receipts** - every governed action gets a verifiable receipt
- **Audit export** - signed manifests, close bundles, and cost attribution ready for review
- **Budget tags** - attribute spend by team, project, customer, or cost center
- **Anomaly detection** - velocity patterns, split-purchase detection, and auto-pause

---

## Quickstart

**TypeScript**

```ts
import { Wallet } from "@nornr/sdk";

const wallet = await Wallet.create({
  owner: "my-agent",
  dailyLimit: 50,
  requireApprovalAbove: 20,
  baseUrl: "https://nornr.com",
});

const decision = await wallet.pay({
  amount: 12.5,
  to: "openai",
  purpose: "model inference",
});

if (decision.status === "approved") {
  await openai.chat.completions.create({ model: "gpt-4o", messages });
} else if (decision.requiresApproval) {
  await wallet.approveIfNeeded(decision);
} else {
  console.log("Blocked:", decision.reasons);
}
```

**Python**

```python
from agentpay import Wallet

wallet = Wallet.create(
    owner="my-agent",
    daily_limit=50,
    require_approval_above=20,
    base_url="https://nornr.com",
)

decision = wallet.pay(
    amount=12.50,
    to="openai",
    purpose="model inference",
)

if decision.get("status") == "approved":
    response = openai_client.chat.completions.create(model="gpt-4o", messages=messages)
elif decision.get("requiresApproval"):
    wallet.approve_if_needed(decision)
else:
    print("Blocked:", decision.get("reasons"))
```

---

## Install

From this repo today:

```bash
# TypeScript / JavaScript
npm install ./packages/sdk-ts

# Python
pip install -e packages/sdk-py
```

Published package identifiers:

- TypeScript: `@nornr/sdk`
- Python: `agentpay`

SDK repos:

- [TypeScript SDK](https://github.com/NORNR/sdk-ts)
- [Python SDK](https://github.com/NORNR/sdk-py)

---

## Core concepts

**Workspace** - your organization's control environment. Contains agents, policies, ledger, and audit history.

**Agent** - a spend identity. One agent per autonomous process. Each gets its own policy, ledger, and receipts.

**Policy** - the rules that govern what an agent can do:

- `dailyLimitUsd` - hard cap per day
- `maxTransactionUsd` - single transaction ceiling
- `requireApprovalOverUsd` - everything above this goes to the approval queue
- `counterpartyAllowlist` - explicit list of allowed recipients
- `autoPauseOnAnomaly` - pause the agent automatically if something looks wrong

**Payment intent** - an agent's request to spend. Evaluated against policy before the agent acts. Status: `approved`, `queued`, or `rejected`. By default NORNR governs whether the agent is allowed to spend; when a settlement adapter is configured, NORNR can also execute the release on-rail.

**Receipt** - immutable record of every governed action. Signed and stored. When NORNR is used purely as a control plane, the agent's actual payment happens via its own rails after receiving an approved decision.

**Audit export** - a signed bundle of intents, approvals, receipts, and ledger entries.

---

## Works with your agent framework

NORNR is framework-agnostic. Drop it into whatever you are already building with:

- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- [LangChain / LangGraph](https://langchain.com)
- [CrewAI](https://crewai.com)
- [AutoGen](https://microsoft.github.io/autogen/)
- any HTTP client

Examples:

- [OpenAI Agents example](./examples/python/openai_agents_sdk_wallet.py)
- [LangChain example](./examples/python/langchain_wallet_tools.py)
- [Wallet quickstart](./examples/python/wallet_quickstart.py)

---

## Why not X?

| | NORNR | AgentKit (Coinbase) | Stripe Treasury | Build it yourself |
|---|---|---|---|---|
| **Primary focus** | Spend governance + audit | Crypto wallet rails | Bank-grade money movement | Whatever you wire up |
| **Policy engine** | ✓ Built-in | ✗ | ✗ | You build it |
| **Approval queue** | ✓ Slack + API | ✗ | ✗ | You build it |
| **Anomaly detection** | ✓ | ✗ | ✗ | You build it |
| **Signed audit export** | ✓ | ✗ | ✗ | You build it |
| **Requires crypto** | Optional | Required | No | — |
| **Works with any agent framework** | ✓ | Partial | ✗ | — |
| **Enterprise control plane** | ✓ | ✗ | Partial | You build it |

**AgentKit** gives you crypto rails. NORNR gives you the layer above that decides whether a transaction should happen at all - and proves it afterward.

**Stripe Treasury** moves money for businesses. NORNR governs which agents are allowed to initiate that movement, under what mandate, and with what audit trail.

**Building it yourself** works for one agent. It becomes a liability at ten.

---

## Pricing

Subscriptions carry the product today. Governed spend is mainly the upgrade trigger; optional settlement fees only apply when NORNR itself executes a configured rail adapter.

|  | Free | Builder | Growth | Enterprise |
|---|---|---|---|---|
| Governed spend | $500/mo | $10k/mo | $100k/mo | Custom |
| Agents | 3 | 25 | 100 | Unlimited |
| Slack approvals | - | yes | yes | yes |
| Budget caps | - | yes | yes | yes |
| Anomaly inbox | - | yes | yes | yes |
| Audit export | - | yes | yes | yes |
| Cost attribution | - | - | yes | yes |
| SSO / SAML | - | - | - | yes |
| Price | $0 | $79/mo | $299/mo | Contact us |

Free tier is free forever. No credit card required.

---

## Connect an existing workspace

**TypeScript**

```ts
const wallet = await Wallet.connect({
  apiKey: process.env.NORNR_API_KEY,
  agentId: "agent_abc123",
  baseUrl: "https://nornr.com",
});
```

**Python**

```python
import os

wallet = Wallet.connect(
    api_key=os.environ["NORNR_API_KEY"],
    agent_id="agent_abc123",
    base_url="https://nornr.com",
)
```

---

## Get started

[Create a free workspace ->](https://nornr.com)

If you are building agent infrastructure, a multi-agent system, or an agentic product with real spend, we want to hear from you.

---

## Philosophy

Autonomy without accountability is not freedom. It is unowned liability.

NORNR is built on the premise that the companies that will actually deploy autonomous agents at scale are the ones who can answer: what did my agents spend, why was it allowed, and who approved it?

We are building the infrastructure that makes that answer possible.

---

## License

MIT - SDKs are open source. The hosted control plane is a commercial product.
