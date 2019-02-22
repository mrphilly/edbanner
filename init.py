from flask import Flask, render_template, request, redirect, url_for,send_from_directory, jsonify
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

app = Flask(__name__,  template_folder='edbanner')
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
        print(description)
        print(prix)
        print(tel)
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding="ascii")
        im = Image.open(BytesIO(base64.b64decode(image_data)))
        print(im.save('uploads/image.png'))
        url = url_for('uploaded_file', filename='image.png', _external=True)
        adwords_client = adwords.AdWordsClient.LoadFromStorage()
        print(ads.ads(adwords_client, NUMBER_OF_CAMPAIGNS_TO_ADD, NUMBER_OF_ADGROUPS_TO_ADD,NUMBER_OF_KEYWORDS_TO_ADD, url, description, prix, tel))

     return  url



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
if __name__ == "__main__":
    app.run(debug=True)