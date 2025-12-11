---
layout: default
title: "Mermaid Diagramming in Jekyll in 2025"
mermaid: true
---
```mermaid



flowchart LR
%%subgraph psscrm
    subgraph oversight 
        direction TB
        A
        C
        D
        E
        M 
    end


subgraph pipeline
    direction LR
    Build[/Build\]
    Build --> Package[Package]
    Package --> Deploy[/Deploy\]
    Deploy --> Run[/Run\]
    Run --> Retire[/Retire\]
end
subgraph packages
    Internal[Internally-developed<br>source] --> Build
    External[Third-party<br>components<br>and containers] --> Build
end
    subgraph security_practices
        direction LR
        B
        F
    end
    G-->Internal
    H-->External
    J-->External
    N-->Internal
    N-->External
    N-->Run
    I-->Internal
    I-->Build 
    K-->Build
    K-->External
    K-->Internal
    K-->Retire

    L --> Build
    O --> Run
    A2 --> Package

    %%Management@{ shape: tri, label: "Business<br>management" }
    %%style Management fill:#008000
    classDef management fill:#008000
    %%Security@{ shape: tri, label: "Software<br>Security", color:orange }
    %%style Security fill:#FFA500
    classDef security fill:#FFA500
    %%Development@{ shape: tri, label: "Architect/Developer", color:red }
    %%style Development fill:#FF0000
    classDef development fill:#FF0000
    %%DevOps@{ shape: tri, label: "DevOps", color:white }
    %%style DevOps fill:#800080, 
    classDef devops fill:#800080 
    %%IT@{ shape: tri, label: "IT", color:blue }
    %%style IT fill:#0000FF
    classDef it fill:#0000FF

    class A,C,E management;
    class B,D,F security;
    class G,H,I,J,K,N development;
    class M it;
    class A2,L,O devops;

    %% A@{ shape: tri, label: "G.1 Perform<br>compliance" }
    %% A2@{ shape: tri, label: "G.1 Perform<br>compliance" }
    A(["G.1 Perform<br>compliance"])
    A2(["G.1 Perform<br>compliance"])
	
	B([" G.2 Develop security policies"])
	C(["G.3 Manage suppliers"])
	D([" G.4 Training"])
	E(["G.5 Assess and manage risk"])
	F([" P.1 Develop security requirements"])
	G([" P.2 Build security in"])
	%%H@{ shape: tri, label: " P.3 Manage<br>component<br> and container choices"}
	H([" P.3 Manage<br>component<br> and container choices"])
	I([" P.4 Discover vulnerabilities"])
	J([" P.5 Manage vulnerable components and containers"])
	K([" E.1 Safeguard artifact integrity"])
	L([" E.2 Safeguard build integrity"])
	M([" E.3 Secure software development environment"])
	N([" D.1 Respond to/disclose vulnerabilities"])
	O([" D.2 Monitor intrusions/violations"])

    click A "https://p-sscrm.github.io/framework/practices/g-1/" _blank
    click A2 "https://p-sscrm.github.io/framework/practices/g-1/" _blank
    click B "https://p-sscrm.github.io/framework/practices/g-2/" _blank
    
    click C "https://p-sscrm.github.io/framework/practices/g-3/" _blank
    click D "https://p-sscrm.github.io/framework/practices/g-4/" _blank
    click E "https://p-sscrm.github.io/framework/practices/g-5/" _blank
    click F "https://p-sscrm.github.io/framework/practices/p-1/" _blank
    click G "https://p-sscrm.github.io/framework/practices/p-2/" _blank
    click H "https://p-sscrm.github.io/framework/practices/p-3/" _blank
    click I "https://p-sscrm.github.io/framework/practices/p-4/" _blank
    click J "https://p-sscrm.github.io/framework/practices/p-5/" _blank
    click K "https://p-sscrm.github.io/framework/practices/e-1/" _blank
    click L "https://p-sscrm.github.io/framework/practices/e-2/" _blank
    click M "https://p-sscrm.github.io/framework/practices/e-3/" _blank
    click N "https://p-sscrm.github.io/framework/practices/d-1/" _blank
    click O "https://p-sscrm.github.io/framework/practices/d-2/" _blank

    %%end


```
