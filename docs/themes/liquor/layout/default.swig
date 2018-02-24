<!DOCTYPE html>
<html>
<head>
  <meta charSet='utf-8' />
  <title>{{config.title}}</title>
  <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/4.0.0/normalize.min.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
  <link href='css/docs.css' rel='stylesheet'>
</head>
<body>
  <div class='menu'>
    <div class='logo'>
      <img src="img/vue-logo.png" alt="">
      <span>LiquorTree</span>
    </div>
    <nav class='menu-nav'>
      {% for section in site.data.nav %}
        <ul class='nav'>
          <a href='{{ section.href }}'><span>{{ section.title }}</span></a>
          {% if section.items %}
            <ul class='nav'>
              {% for item in section.items %}
                <li>
                  <a href='{{ item.href }}'>{{item.title}}</a>

                  {% if item.items %}
                    <ul class='nav'>
                      {% for item in item.items %}
                        <li>
                          <a href='{{ item.href }}'>{{item.title}}</a>
                        </li>
                      {% endfor %}
                    </ul>
                  {% endif %}
                </li>
              {% endfor %}
            </ul>
          {% endif %}
        </ul>
      {% endfor %}
    </nav>
  </div>
  <div class='page'>
    <div class='page-content'>
      <h1>{{page.title}}</h1>
      {{page.content}}
    </div>
  </div>
</body>
</html>
