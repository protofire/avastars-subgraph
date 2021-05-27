# avastars-subgraph

## Intro

This subgraph aims to create a friendly experience for front-end developers, allowing to create new tools over the avastars project. The main idea behind this subgraphs y to create some sort of lookup matrix that allows to sort & group avastars by any of it's properties:

		"All primes group by gene, by generation, by gender, by rarity, etc"

As a begining, this subgraph offers a core structure for more specific kinds of data analysis involving metrics between entities:

		"Most rarest trait yet, the minting time-ratio, etc"

Beyond current structure, this subgraphs offers a basic transaction module which itself can be a separate subgraph


## Schema and entities

### Global State entities

		· MetadataState
		· TeleporterState
		· PrimeMinterState
		· GlobalState

Tracks the current state of each contract (primeMinter, teleporter, metadata) and compose them into the singleton globalState entity.

### Shared Properties entities 

Those are the `properties` shared between avastars and traits. Most of thme are `one-to many` between the properties and it's related avastars/traits. 

Each shared property entity relies on a corresponding `enum` that describe the actual property name. The enums are related to integer values.

Only `Serie` has en especial `many to many` relationship with Traits entities which involves the intermediate `TraitSerie` entity

		· Generation
		· Wave
		· Gene
		· Rarity
		· Serie
		
## Example queries

```graphql
# Get first 50 avastars
{
  avastars (first: 50){
	  serial
	  generation{
		  
		  minted
	  }
	  series{
		  
		  minted
	  }
	  gender{
		  
		  minted
	  }	
	  wave{
		  
		  minted
	  }

  }
}
```


```graphql
# Get all rarity levels including related traits
{
   rarities{
    name
    traits{
      name
      variation
      gene{
        name
      }
    }
  }
}
```


```graphql
# Get avastars by gender
{
   genders{
    name
    minted
    avastars(first:5){
		serial
		generation {
			name
		}

	}
  }
}
```

```graphql
# Get traits by serie
{
   series{
    name
    minted
    avastars(first:5){
		serial
		generation {
			name
		}

	}
  }
}
```

```graphql
# Get traits by serie
{

type PrimeMinterState @entity {
	"Internal ID used for indexation"
	id: ID!
	
	"Current prime minter contract address"
	address: Bytes

	"Current prime minter contract status"
	paused: Boolean
}
# get avastars current global state
GlobalState{
	primeMinter: {
		address
		paused
	}
	teleporter: {
		address
		paused
	} 
	metadata: {
		address
		paused
	} 
	currentSerie:{
		name
	}
	currentGeneration: {
		name
	}

}
```
