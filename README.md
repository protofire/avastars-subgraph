# avastars-subgraph
## Example queries

Get all avastars with it's properties name

```graphql
{
  avastars{
	  series{
		  name
	  }
  }
}
```

```graphql
{
  avastars{
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
}
```
