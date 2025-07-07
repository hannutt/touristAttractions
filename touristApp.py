from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def start():
    cities=['Helsinki','Tampere','Seinäjoki','Oulu']

    return render_template('index.html',cities=cities)

if __name__ == '__main__':
    app.run(debug=True)