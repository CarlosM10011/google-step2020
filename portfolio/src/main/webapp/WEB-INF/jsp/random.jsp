<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Generate a random fact</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>

<body>
    <jsp:include page="include/top_nav_bar.jsp"></jsp:include>
    <main id="content">
        <p>Click below to get a random fact!</p>
        <button onclick="addRandomFact()">Click It</button>
        <div id="fact-container"></div>
    </main>
    <script src="/static/js/script.js"></script>
</body>

</html>
