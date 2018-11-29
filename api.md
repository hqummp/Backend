# API Document

## InfoManager

### addInfo

**POST** /info/addInfo

#### Request

* **year** int
* **month** int
* **day** int
* **source** string
* **category** string
* **subcategory** string
* **title** string
* **subtitle** string
* **content** string
* **remark** string
* **level** int

#### Response

* Success
  
  HTTP 200

  ```JSON
  {
      "message" : "OK"
  }
  ```

* date_illegal

HTTP 422

```JSON
{
    "message" : "ILLEGAL_DATE"
}
```

* datebase_error

HTTP 422

```JSON
{
     "message" :"DATABASE_ERROR"
}
```

### deleteInfoById

**POST** /delete

#### Request

* **id** string

#### Response

* Success
  
  HTTP 200

  ```JSON
  {
      "message" : "OK"
  }
  ```

* datebase_error

HTTP 422

```JSON
{
     "message" :"DATABASE_ERROR"
}
```

### queryInfo

**POST** /query
  
#### Request

* **id** string
* **source** string
* **category** string

#### Response

* Success
  
  HTTP 200

  ```JSON
  {
      "message" : "OK"
  }
  ```

* datebase_error

HTTP 422

```JSON
{
     "message" :"DATABASE_ERROR"
}
```

### updateInfo

**POST** /modify

#### Request

* **id** string
* **year** int
* **month** int
* **day** int
* **source** string
* **category** string
* **subcategory** string
* **title** string
* **subtitle** string
* **content** string
* **remark** string
* **level** int

#### Response

* Success
  
  HTTP 200

  ```JSON
  {
      "message" : "OK"
  }
  ```

* date_illegal

HTTP 422

```JSON
{
    "message" : "ILLEGAL_DATE"
}
```

* datebase_error

HTTP 422

```JSON
{
     "message" :"DATABASE_ERROR"
}
```
### Alldata

**get** /alldata

#### Request


#### Response

* Success
  
  HTTP 200

  ```JSON
  {
      "message" : "OK"
  }
  ```

* datebase_error

HTTP 422

```JSON
{
     "message" :"DATABASE_ERROR"
}
```
