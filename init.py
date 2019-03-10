from flask import Flask, render_template, request, session, redirect, url_for,send_from_directory, jsonify
import sys
import json
import cgi
import os
from googleads import adwords
from ads import ads
from werkzeug import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import base64
from io import BytesIO
from PIL import Image
import requests
import time
import execjs
from requests.exceptions import MissingSchema

app = Flask(__name__,  template_folder='edbanner')
app.secret_key = "1234@Zerty"
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config['JSON_SORT_KEYS'] = False
NUMBER_OF_CAMPAIGNS_TO_ADD = 1
NUMBER_OF_ADGROUPS_TO_ADD = 1
NUMBER_OF_KEYWORDS_TO_ADD = 5

@app.route("/")
def main():
    return render_template('index.html')


@app.route('/upload', methods=['POST','GET'])
def upload():
    if request.method == 'POST':
        _result = request.form.to_dict()
        file = _result['input-image']
        description = _result['input-desc']
        prix = _result['input-prix']
        tel = _result['input-tel']
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        print(im.save('uploads/image.png'))
        url = url_for('uploaded_file', filename='image.png', _external=True)

    adwords_client = adwords.AdWordsClient.LoadFromStorage()
    print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, url, description, prix, tel))

    return  main()



# configs
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])



# extension checker
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.errorhandler(RequestEntityTooLarge)
def handle_file_size_exception(error):
    '''Return a custom message and 413 status code'''
    return jsonify({'message': 'File is too big'}), 413

# check size


# image compressor

# upload handler
@app.route('/', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_url = url_for('uploaded_file', filename=filename, _external=True)
        data = {
            'success':True,
            'message': 'File successfully uploaded',
            'data': {
                'file_url': file_url
            }
        }
        return jsonify(data)

    else:
        data = {
            'success':False,
            'message': 'Please provide a correct extension',
        }
        return jsonify(data), 404



# download handler
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)


@app.route('/pay',  methods=['POST'])
def pay():
        """
        Get payexpress token
        """
        req = ""

        url = 'https://payexpresse.com/api/payment/request-payment'
        cancel_url = "http://banner.comparez.co"
        success_url = "http://banner.comparez.co/?pay=ok"
        #cancel_url = "http://0.0.0.0:5009"
        #success_url = "http://0.0.0.0:5009/?pay=ok"

        amount_due = round(2000)

        infos = {
            'item_name':'Mon achat',
            'item_price':amount_due,
            'currency':'XOF',
            'ref_command':time.time(),
            'command_name':'Mon achat',
            'env':'test',
            'success_url':success_url,
            'cancel_url':cancel_url
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'API_KEY':"3e379206e070968fa5cb0f63c5ef1a4cb3a988f037cbe5af6f456d124af0b819",
            'API_SECRET':"f3a6c5f015ea7352fd067d4fd0fbcc2c106f89c9f3858af890f6d25aa75ffbae",
        }

        req = requests.post(url, data=infos, headers=headers)

        req = req.json()
        print(req)
        req['redirect_url'] = 'https://payexpresse.com/payment/checkout/' +req['token']



        return jsonify(req)

@app.route("/ads", methods=["POST"])
def makeAds():
    status = request.json['response']
    final = ""
    if status =='ok':
        try:
            print(status)
            adwords_client = adwords.AdWordsClient.LoadFromStorage()
            print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, session['img'], session['description'], session['prix'], session['telephone']))
            final = "ok"
        except:
            main()
        session['description'] = ""
        session['img'] = ""
        session['prix'] = ""
        session['telephone'] = ""


    return final


@app.route("/session", methods=["POST"])
def session_save():
    result = request
    file = result.json['img']
    session['description'] = result.json['description']
    session['prix'] = result.json["prix"]
    session["telephone"] = result.json["tel"]
    print(result.json['tel'])
    starter = file.find(',')
    image_data = file[starter+1:]
    image_data = bytes(image_data, encoding="ascii")
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    print(im.save('uploads/image.png'))
    url = url_for('uploaded_file', filename='image.png', _external=True)
    session['img'] = url


    return "ok"




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5009)

