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
		  name
	  }
	  series{
		  name
	  }
	  gender{
		  name
	  }	
	  wave{
		  name
	  }

  }
}
```
